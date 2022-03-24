import { Component, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppModule } from './app.module';

import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mobile Demo Test';
  lastRecorded?: RecordingData;
  base64Sound?: string;
  mimeType?: string;

  constructor(public messageService: MessageService, private http: HttpClient) { }
  getRecordingPermission(): void {
    VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
      console.log(result.value);
      this.messageService.add(String(result.value));
    })
  }
  startRecordingAudio(): void {
    VoiceRecorder.startRecording().then((result: GenericResponse) => {
      console.log(result.value);
      this.messageService.add(String(result.value));
    }).catch(error => {
        console.log(error)
        this.messageService.add(String(error));
    });
  }
  stopRecordingAudio(): void {
    VoiceRecorder.stopRecording().then((result: RecordingData) => {
      this.lastRecorded = result;
      this.base64Sound = result.value.recordDataBase64;
      this.mimeType = result.value.mimeType;
      this.messageService.add(JSON.stringify(result.value));
    }).catch(error => {
        console.log(error)
        this.messageService.add(String(error));
    });
  }
  uploadAudio(): void {
    this.messageService.add(JSON.stringify(this.lastRecorded));
    if (this.base64Sound && this.mimeType) {
      try {
        //let audioRef = new Audio(`data:${this.mimeType};base64,${this.base64Sound}`);
        //let audioRef = new Audio(this.base64Sound);
        //audioRef.oncanplaythrough = () => audioRef.play();
        //audioRef.load();
        this.http.post<unknown> ("http://127.0.0.1:5000/audio", { 'base64': this.base64Sound }, httpOptions).subscribe(r=>{})
        //this.http.post<unknown> ("http://103.252.201.197:5000/audio", { 'base64': this.base64Sound }, httpOptions).subscribe(r=>{})
        this.messageService.add("uploaded")
      } catch (error) {
        this.messageService.add(String(error));
      }
    } 
  }
  playAudio(): void {
    console.log(this.lastRecorded);
    this.messageService.add(JSON.stringify(this.lastRecorded));
    if (this.base64Sound && this.mimeType) {
      try {
        let audioRef = new Audio(`data:${this.mimeType};base64,${this.base64Sound}`);
        //let audioRef = new Audio(this.base64Sound);
        audioRef.oncanplaythrough = () => audioRef.play();
        audioRef.load();
      } catch (error) {
        this.messageService.add(String(error));
      }
    } 
  }
}
