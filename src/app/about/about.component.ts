import { Component, OnInit } from '@angular/core';
import * as TextContent from '../../assets/textContent.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  content = TextContent;

  constructor() { }

  ngOnInit(): void {
  }

}
