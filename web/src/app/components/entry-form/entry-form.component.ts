import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DoctorsService } from 'src/app/services/doctors.service'

@Component({
    selector: 'entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.sass']
})
export class EntryFormComponent implements OnInit {
    private entryData: any = {}
    public mapImageUrl: string
    public bestDoctors: Array<any>
    public mockMapImageUrl: string = `http://joomly.net/frontend/web/images/googlemap/map.png`
    @Output() formReady = new EventEmitter()
    constructor(private doctorsService: DoctorsService) { }

    ngOnInit() {
        if(window.navigator.geolocation)
            window.navigator.geolocation.getCurrentPosition(this.setUserLocation.bind(this))
    }

    public getLocation() {
        if(window.navigator.geolocation)
            window.navigator.geolocation.getCurrentPosition(this.setUserLocation.bind(this))
    }

    private setUserLocation({coords}) {
        console.log(coords)
        this.mapImageUrl = `https://image.maps.api.here.com/mia/1.6/mapview?app_id=xgMo2GgK6YldlFQm5W1T&app_code=i-qtL4vwaRn-OnXEfwIOJg&c=${coords.latitude},${coords.longitude}&z=12&ml=pl&w=1600&h=1600&ppi=192`
        this.entryData.lat = coords.latitude
        this.entryData.lon = coords.longitude
        this.entryData.accuracy = coords.accuracy
        this.entryData.profession = 'ginekolog'
        this.entryData.city = 'warszawa'
        this.submitForm()
    }

    public submitForm() {
        this.doctorsService.getBestDoctors(this.entryData)
        .then((res: Array<any>) => this.bestDoctors = res)
    }

}
