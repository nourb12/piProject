import { Component } from '@angular/core';

@Component({
  selector: 'app-colorlegends',
  templateUrl: './colorlegends.component.html',
  styleUrls: ['./colorlegends.component.css']
})
export class ColorlegendsComponent {
  categories = [
    { name: 'Scheduled', color: '#1e90ff' },
    { name: 'Completed', color: '#32CD32' }
  ];


}
