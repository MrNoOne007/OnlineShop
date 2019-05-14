import { NgModule } from '@angular/core';

import { MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule, WavesModule,CardsFreeModule,
} from 'angular-bootstrap-md'

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconModule,
  CarouselModule,
  WavesModule,
  CardsFreeModule
]
@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
