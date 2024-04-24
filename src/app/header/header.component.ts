import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  searchUsers(): void {
    this.searchEvent.emit(this.searchQuery);
  }
}
