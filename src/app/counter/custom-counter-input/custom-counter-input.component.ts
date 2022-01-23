import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';

import { AppState } from './../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value = 0;
  channelName$: Observable<string> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd(): void {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
