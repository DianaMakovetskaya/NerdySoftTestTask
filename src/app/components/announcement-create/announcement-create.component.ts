import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnnouncementService} from "../../services/announcement.service";
import {DatePipe} from "@angular/common";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.css']
})
export class AnnouncementCreateComponent implements OnInit {
 form: FormGroup;
 similarAnnouncements:any=[];


  constructor(private dialogRef: MatDialogRef<AnnouncementCreateComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public service: AnnouncementService,private datePipe: DatePipe ) {
    let ID = service.getLastId()+1;
    let date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    if(data){
      this.form = new FormGroup({
        Id:new FormControl(data.Id),
        title: new FormControl(data.title),
        description: new FormControl(data.description),
        date: new FormControl(data.date)
      });
      this.similarAnnouncements = this.service.getSimilarAnnouncements(data);
    }else{
      this.form = new FormGroup({
        Id:new FormControl(ID),
        title: new FormControl(''),
        description: new FormControl(''),
        date: new FormControl(date)
      });
    }
  }

  ngOnInit(): void {

  }

  save() {
    this.dialogRef.close();
    if (this.data) {
      this.service.updateAnnouncement(this.form.value);

    } else {
      this.service.createAnnouncement(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close();
    this.service.deleteAnnouncement(this.form.value.Id);
  }
}
