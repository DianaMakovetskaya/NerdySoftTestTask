import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }
  getAllAnnouncements() {
    return AnnouncementsList;
  }
  createAnnouncement(config:any){
    AnnouncementsList.push(config)
  }
  deleteAnnouncement(id:string){
    let index = AnnouncementsList.findIndex(function(el:any){
      return el.Id === id;
    })
    if (index !== -1) AnnouncementsList.splice(index, 1);
  }
  updateAnnouncement(config:any){
    let index = AnnouncementsList.findIndex(function(el:any){
      return el.configId === config.configId;
    })
    AnnouncementsList[index]= config;
  }
  getLastId(): number{
    return AnnouncementsList.length
  }
  getSimilarAnnouncements(announcement: any):any{
    let mainAnnouncementTitle = announcement.title.split(' ');
    let mainAnnouncementDesc = announcement.description.split(' ');
    let similarAnnouncements:any=[];

    for (let i = 0; i < AnnouncementsList.length; i++) {
      let simAnnouncementTitle = AnnouncementsList[i].title.split(' ');
      let simAnnouncementDesc = AnnouncementsList[i].description.split(' ');
      for (let a = 0; a < mainAnnouncementTitle.length; a += 1) {
        for (let b = 0; b < simAnnouncementTitle.length; b += 1) {
          if (mainAnnouncementTitle[a] === simAnnouncementTitle[b] && announcement.Id != AnnouncementsList[i].Id) {
            for (let c = 0; c < mainAnnouncementDesc.length; c++) {
              for (let d = 0; d < simAnnouncementDesc.length; d++) {
                if (mainAnnouncementDesc[c] === simAnnouncementDesc[d]) {
                  console.log(mainAnnouncementDesc[c],simAnnouncementDesc[d])
                  similarAnnouncements.push(AnnouncementsList[i]);
                }
              }
            }
          }
        }
      }
    }
    similarAnnouncements = similarAnnouncements.slice(0, 3);
    return similarAnnouncements;
  }


}
let AnnouncementsList: any = []
