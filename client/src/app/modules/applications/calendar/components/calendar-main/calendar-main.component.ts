import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSourceService } from 'src/app/core/services/event-source.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NewEventComponent } from '../new-event/new-event.component';
import { EventService } from 'src/app/core/services/event.service';
import * as qs from 'qs'
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.component.html',
  styleUrls: ['./calendar-main.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class CalendarMainComponent extends AppHelperComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768
  }
  public isMobile = window.innerWidth < 768;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  selectedDate: { start: Date, end: Date } | null = null;
  viewTitle = false;
  public selectedSource: any;
  private refBehavior: any;
  private refSource: any;
  private refEvents: any;
  private refDialog: any;
  private subSeen;
  calendarOptions: CalendarOptions = {
    headerToolbar: false,
    height: '100%',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: frLocale,
    eventSources: [],
    weekNumbers: true,
    navLinks: true,
    navLinkDayClick: (date, jsEvent) => {
      this.calendarComponent.getApi().gotoDate(date);
      this.calendarComponent.getApi().changeView('timeGridDay');
    },
    navLinkWeekClick: (date, jsEvent) => {
      this.calendarComponent.getApi().gotoDate(date);
      this.calendarComponent.getApi().changeView('timeGridWeek');
    },
    eventClick: (info) => {
      this.showEvent(info.event);
    },
    eventDrop: (info) => {
      this.editEvent(info.event);
    },
    eventResize: (info) => {
      this.editEvent(info.event);
    },
    select: (info) => {
      if (info.start && info.end) {
        this.selectedDate = {
          start: info.start,
          end: info.end,
        };
      }
    },
    unselect: (info) => {
      setTimeout(() => {
        this.selectedDate = null;
      }, 10);
    },

  };
  public itemsDay: MenuItem[] = [
    { label: 'Vue liste', icon: 'fa-regular fa-calendar-minus', command: () => this.changeViewCalendar('listDay') },
  ];
  public itemsWeek: MenuItem[] = [
    { label: 'Vue liste', icon: 'fa-regular fa-calendar-days', command: () => this.changeViewCalendar('listWeek') },
  ];
  public itemsMobile: MenuItem[] = [
    { label: 'Vue semaine', icon: 'fa-solid fa-calendar-week', command: () => this.changeViewCalendar('week') },
    { label: 'Vue semaine liste', icon: 'fa-regular fa-calendar-days', command: () => this.changeViewCalendar('listWeek') },
    { label: 'Vue jour', icon: 'fa-solid fa-calendar-day', command: () => this.changeViewCalendar('day') },
    { label: 'Vue jour liste', icon: 'fa-regular fa-calendar-minus', command: () => this.changeViewCalendar('listDay') },
  ]
  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private eventSourceService: EventSourceService,
    private eventService: EventService,
    private authentificationService: AuthentificationService,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }
  ngOnDestroy(): void {
    this.unref();
    if (this.refBehavior) {
      this.refBehavior.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.subSeen = setTimeout(() => { this.calendarComponent.getApi().updateSize(); this.viewTitle = true }, 550);
  }

  private unref() {
    if (this.refSource) {
      this.refSource.unsubscribe();
    }
    if (this.refEvents) {
      this.refEvents.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.selectSource(params['id']))
    this.refBehavior = this.eventService.observableEvents.subscribe(event => this.updateCalender(event))
  }
  selectSource(idSource: any) {
    this.unref();
    if (idSource) {
      this.refSource = this.eventSourceService.findOne(idSource).subscribe({
        next: (data) => {
          this.selectedSource = data.data;
          this.addEventSource();
        },
        error(err) {

        },
      })
    } else {
      this.selectedSource = null;
    }
  }

  private addEventSource() {
    const eventSource = this.calendarComponent.getApi().getEventSources()[0]
    if (eventSource) {
      this.calendarComponent.getApi().getEventSourceById(eventSource.id)?.remove()
    }
    this.calendarComponent.getApi().addEventSource(
      {
        id: this.selectedSource.id,
        events: (info, successCallback, failureCallback) => {
          const query = qs.stringify({
            filters: {
              'event_source': {
                id: this.selectedSource.id,
                owner: this.authentificationService.connectedUser.id
              },
              start: {
                $gte: info.start,
              },
              $or: [
                {
                  end: {
                    $lte: info.end,
                  },
                },
                {
                  end: {
                    $null: info.end
                  }
                }
              ]
            },
            populate: ['']
          }, {
            encodeValuesOnly: true,
          });
          this.eventService.find(query).subscribe(result => {
            successCallback(result.data.map(item => {
              return {
                ...item, extendedProps: item
              }
            }));
          });
        },
        color: this.selectedSource.color,
      }
    );
  }

  showEvent(eventToEdit: any) {
    this.refDialog = this.dialogService.open(NewEventComponent, {
      header: 'Evenement ' + eventToEdit.title,
      baseZIndex: 10000,
      data: {
        sourceEvent: this.selectedSource,
        event: eventToEdit
      }
    });

    this.refDialog.onClose.subscribe((event: any) => {
      if (!event) {
        return;
      }
      if (event.delete) {
        this.confirmDeleteEvent(eventToEdit);
      }
      else {
        const eventToSend = {
          title: event.title,
          start: event.start,
          end: event.end,
          event_source: event.sourceEvent,
          sharedWith: event.sharedWith || [],
          description: event.description,
          allDay: event.allDay,
          id: eventToEdit.id
        }
        this.eventService.update(eventToSend).subscribe();
      }
    });
  }

  editEvent(event) {
    const eventToSend = {
      title: event.title,
      start: event.start,
      end: event.end ? event.end : event.start,
      event_source: event.sourceEvent,
      sharedWith: event.sharedWith || [],
      description: event.description,
      allDay: event.allDay,
      id: event.id
    }
    this.eventService.update(eventToSend).subscribe();
  }

  moveCalendar(state: string) {
    if (state === 'prev') {
      this.calendarComponent.getApi().prev();
    } else if (state === 'next') {
      this.calendarComponent.getApi().next();
    } else if (state === 'today') {
      this.calendarComponent.getApi().today();
    }
  }
  changeViewCalendar(state: string) {
    if (state === 'day') {
      this.calendarComponent.getApi().changeView('timeGridDay');
    } else if (state === 'week') {
      this.calendarComponent.getApi().changeView('timeGridWeek');
    } else if (state === 'month') {
      this.calendarComponent.getApi().changeView('dayGridMonth');
    } else if (state === 'listDay') {
      this.calendarComponent.getApi().changeView('dayGridDay');
    } else if (state === 'listWeek') {
      this.calendarComponent.getApi().changeView('dayGridWeek');
    }

  }
  confirmDeleteEvent(event: any) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet événement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventService.delete(event.id).subscribe();
        return;
      },
      reject: (type) => {
        this.showEvent(event);
        return;
      }
    });
  }

  createNewEvent() {
    this.refDialog = this.dialogService.open(NewEventComponent, {
      header: 'Ajouter un nouvel evenement',
      baseZIndex: 9000,
      data: {
        start: this.selectedDate?.start,
        end: this.selectedDate?.end,
        sourceEvent: this.selectedSource,
      }
    });

    this.refDialog.onClose.subscribe((event: any) => {
      if (event) {
        const eventToSend = {
          title: event.title,
          start: event.start,
          end: event.end,
          event_source: event.sourceEvent,
          sharedWith: event.sharedWith || [],
          description: event.description,
          allDay: event.allDay
        }
        this.eventService.create(eventToSend).subscribe();
      }
    });
  }

  private updateCalender(event: any) {
    // Need improvement // TODO
    if (!event) return;
    if (!this.selectedSource) return;
    const events = this.calendarComponent.getApi().getEvents();
    const eventSource = this.calendarComponent.getApi().getEventSources()[0];
    switch (event.type) {
      case 'delete':
        events.find(e => e.id.toString() == event.event.toString())?.remove()
        break;
      case 'create':
        if (!event?.event?.data?.event_source) return;
        if (event.event.data.event_source.id != this.selectedSource.id) return;
        this.calendarComponent.getApi().addEvent(event.event.data, eventSource)
        break
      case 'update':
        if (!event?.event?.data?.event_source) return;
        if (event.event.data.event_source.id != this.selectedSource.id) return;
        events.find(e => e.id.toString() == event.event.data.id.toString())?.remove()
        this.calendarComponent.getApi().addEvent(event.event.data, eventSource)
        break
    }
  }
}
