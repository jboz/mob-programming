import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Sound } from './../sound.model';

@Component({
  selector: 'app-audio-preview',
  templateUrl: './audio-preview.component.html',
  styleUrls: ['./audio-preview.component.scss']
})
export class AudioPreviewComponent implements AfterViewInit {
  @Input()
  sound: Sound;

  @ViewChild('audio')
  private audio: ElementRef<HTMLAudioElement>;

  playing = false;
  duration: string;
  percent = 0;

  constructor() {}

  ngAfterViewInit() {
    this.audio.nativeElement.addEventListener('ended', () => {
      this.playing = false;
      setTimeout(() => {
        this.percent = 0;
      }, 1000);
    });
    this.audio.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = moment
        .duration(Math.round(this.audio.nativeElement.duration), 'seconds')
        .toISOString()
        .replace('PT', '')
        .toLowerCase();
    });
    this.audio.nativeElement.addEventListener(
      'timeupdate',
      () => (this.percent = Math.round((this.audio.nativeElement.currentTime * 100) / this.audio.nativeElement.duration))
    );
  }

  play() {
    this.audio.nativeElement.play().then(() => (this.playing = true));
  }

  pause() {
    this.audio.nativeElement.pause();
    this.playing = false;
  }

  path(fileName: string) {
    return `/assets/sounds/${fileName}`;
  }
}
