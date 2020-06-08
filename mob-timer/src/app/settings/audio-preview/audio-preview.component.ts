import { Component, OnInit } from '@angular/core';
import { Sound } from './../sound.model';

@Component({
  selector: 'app-audio-preview',
  templateUrl: './audio-preview.component.html',
  styleUrls: ['./audio-preview.component.scss']
})
export class AudioPreviewComponent implements OnInit {
  @Input()
  private sound: Sound;

  playing = false;

  constructor() {}

  ngOnInit(): void {}

  play() {}

  pause() {}

  path(fileName: string) {
    return `/assets/sounds/${fileName}`;
  }
}
