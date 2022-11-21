import { FormControl } from "@angular/forms";

export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const file = control.value;
      console.log('requireTypeFile')
      console.log(file)
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
          return {
            requiredFileType: true
          };
        }
        
        return null;
      }
  
      return null;
    };
  }