import { Component, OnInit } from '@angular/core';
import { DataService } from '../view-notes/data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

  note: any; // for subscription and assignment
  subscription: Subscription; // subscription
  noData: boolean = false;

  constructor(private _data: DataService) {

    // subscription from subjects
    this.subscription = this._data.receiver1().subscribe(item => {
      this.note = item;
      if (this.note && this.note.q) {
        this.searchFunction(this.note.q);
      }
      else {
        this.fillNote();
      }
    });

  }

  notesArray: any = [];
  notesArrayCopy: any = []; // copy of notes array for search functionality

  fillNote() {
    this.notesArray = JSON.parse(localStorage.getItem('notes'));
    this.notesArrayCopy = JSON.parse(JSON.stringify(this.notesArray));
  }

  // highlight selected card
  selectCard(data, index) {
    let nodelist = document.querySelectorAll("ul li.card");
    let cards = Array.from(nodelist); // convert nodelist to array
    if (cards) {
      cards.map((item) => { item.className = 'card w-100' })
      cards[index].className += ' highlight'; // add class to selected card
    }
    this._data.dataEmitter2(data);
  }

  searchFunction(value) {
    this.notesArray = this.notesArrayCopy.filter(function (e) {
      return e.text.toLowerCase().indexOf(value.toLowerCase()) >= 0
    });
    if (this.notesArray.length == 0) this.noData = true;
  }



  ngOnInit() {
    this.fillNote();
  }

  // never called
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
