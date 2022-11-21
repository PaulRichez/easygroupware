import { Directive, OnInit, OnDestroy, Input, ViewContainerRef, ChangeDetectorRef, EnvironmentInjector } from "@angular/core";
import { RouterOutlet, ChildrenOutletContexts } from "@angular/router";

@Directive({
  selector: 'named-outlet',
  exportAs: 'outlet'
})
export class NamedOutletDirective implements OnInit, OnDestroy {
  public outlet!: RouterOutlet;
  @Input() public name!: any; // its a string
  constructor(
    private parentContexts: ChildrenOutletContexts,
    private location: ViewContainerRef,

    private changeDetector: ChangeDetectorRef,
    private environmentInjector: EnvironmentInjector
  ) { }
  ngOnInit() {
    this.outlet = new RouterOutlet(this.parentContexts, this.location, this.name, this.changeDetector, this.environmentInjector);
    this.outlet.ngOnInit();
  }
  ngOnDestroy() {
    if (this.outlet)
      this.outlet.ngOnDestroy();
  }
}