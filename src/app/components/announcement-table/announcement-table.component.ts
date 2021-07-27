import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementService} from "../../services/announcement.service";
import {AnnouncementCreateComponent} from "../announcement-create/announcement-create.component";

@Component({
  selector: 'app-announcement-table',
  templateUrl: './announcement-table.component.html',
  styleUrls: ['./announcement-table.component.css']
})
export class AnnouncementTableComponent implements OnInit {
  AnnouncementsList: any[] = [];
  displayedColumns: string[] = ['title', 'description'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator  = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private service: AnnouncementService,public matDialog: MatDialog) {
    this.AnnouncementsList = service.getAllAnnouncements();
    this.dataSource = new MatTableDataSource(this.AnnouncementsList);
  }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this.matDialog.open(AnnouncementCreateComponent,{
      width: '48%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  applyFilter(filterValue: KeyboardEvent) {
    let value = (filterValue.target as HTMLTextAreaElement).value;
    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = value;
  }

  rowClick(row: any) {
    let dialogRef =this.matDialog.open(AnnouncementCreateComponent,{
      width: '48%',
      data:row
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }
  refresh(){
    this.dataSource.data = this.service.getAllAnnouncements();
  }

}
