import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Color } from "tns-core-modules/ui/page/page";
import { CalendarSelectionEventData, RadCalendar, CalendarViewMode, CalendarDayViewStyle, CalendarDayViewEventSelectedData, CalendarEvent, CalendarMonthViewStyle, DayCellStyle } from "nativescript-ui-calendar";
import { RadCalendarComponent } from "nativescript-ui-calendar/angular/calendar-directives";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Provider } from "../../shared/models/provider.model";
import { AppointmentService } from "../../shared/services/appointment.service";
import { Appointment } from "../../shared/models/appointment.model";
import { isAndroid } from "tns-core-modules/ui/page/page";

@Component({
    moduleId: module.id,
    templateUrl: "./calendar-modal.html",
})

export class CalendarModalViewComponent implements OnInit {
    showHeader: boolean;
    dateToday: Date;
    item: Provider;
    availableText: string = "Book Now";
    unavailableText: string = "Booked";
    selectedDate: Date;

    @ViewChild("appointmentDayPicker") appointmentDayPicker: RadCalendarComponent;

    constructor(private _appointmentService: AppointmentService, private params: ModalDialogParams) {
        this.dateToday = new Date();
        this.selectedDate = this.dateToday;
        this.item = params.context;
    }

    ngOnInit() {
        this.showHeader = true;
        const calendar = this.appointmentDayPicker.calendar;
        calendar.monthViewStyle = new CalendarMonthViewStyle();
        calendar.selectedDate = this.dateToday;
    }

    onCloseButtonTap() {
        const calendar = this.appointmentDayPicker.calendar;
        if (calendar.viewMode === CalendarViewMode.Day) {
            calendar.eventSource = [];
            calendar.viewMode = CalendarViewMode.Month;
            this.showHeader = true;
        } else {
            this.params.closeCallback();
        }
    }

    _updateCalendarAppointments() {
        // TODO: Retrieve open slots and set calendar.eventSource here
        // in this example we simply generate slots every 30 min and randomly assign free/busy 
        let rSeed = this.selectedDate.getMonth() * 100 + this.selectedDate.getDate();
        const seedRandom = () => {
            rSeed = rSeed = (rSeed * 9301 + 49297) % 233280;
            return rSeed / 233280;
        }
        const testEvents: Array<CalendarEvent> = [];
        for (let startTime = 0; startTime < 16; startTime++) {
            const startDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(),
                9 + Math.floor(startTime / 2), 30 * (startTime % 2), 0, 0);
            const endDate = new Date(startDate.valueOf());
            endDate.setMinutes(endDate.getMinutes() + 30);
            const isBusy = seedRandom() > 0.7;
            const testEvent = new CalendarEvent(isBusy ? this.unavailableText : this.availableText, startDate, endDate, false, isBusy ? new Color("Gray") : new Color("Green"));
            if (testEvent.startDate.getTime() > (new Date()).getTime()) {
                testEvents.push(testEvent);
            }
        }

        this.appointmentDayPicker.eventSource = testEvents;
    }

    onCalendarLoaded() {
        const calendar = this.appointmentDayPicker.calendar;
        
        if (calendar.android) {
            calendar.android.setShowGridLines(false);

            // Set the beginning / end of the day view events list to be 8 AM / 6 PM
            calendar.android.getDayView().getDayEventsViewStyle().setStartTime(8 * 60 * 60 * 1000)
            calendar.android.getDayView().getDayEventsViewStyle().setEndTime(18 * 60 * 60 * 1000)

            calendar.reload();
        }
    }

    onCalendarDateSelected(args: CalendarSelectionEventData) {
        if (this.selectedDate.getTime() !== args.date.getTime()) {
            this.selectedDate = args.date;
            if (args.object.viewMode === CalendarViewMode.Day) {
                this._updateCalendarAppointments();
            }
        }
    }

    onOkButtonTap() {
        const calendar = this.appointmentDayPicker.calendar;

        if (calendar.viewMode !== CalendarViewMode.Day) {
            this.showHeader = false;
            calendar.displayedDate = this.selectedDate;
            calendar.viewMode = CalendarViewMode.Day;
            if (calendar.ios && calendar.ios.presenter.dayView) {
                calendar.ios.presenter.dayView.eventsView.startTime = 8 * 3600;
                calendar.ios.presenter.dayView.eventsView.endTime = 18 * 3600;
            }
        }

        this._updateCalendarAppointments();
    }

    onCalendarEventSelected(args: CalendarDayViewEventSelectedData) {
        if (args.eventData.title !== this.availableText) {
            return;
        }

        const selectedDate = args.eventData.startDate;
        Kinvey.User.me().then(user => {
            const data = user && user.data as any;
            let startDate = args.eventData.startDate.toISOString();
            let endDate = args.eventData.endDate.toISOString();
            dialogs.confirm({
                title: `Dear ${(data && data.givenName) || "patient"}`,
                message: `Please confirm the appointment with ${this.getProviderName(this.item)} on ${this._formatDateTime(selectedDate)}`,
                okButtonText: "Confirm",
                cancelButtonText: "Cancel"
            }).then(result => {
                if (result) {
                    this.createAppointment(startDate, endDate).then(newAppointment => {
                        this.params.closeCallback({ data: newAppointment });
                    }, (error) => {
                        this.params.closeCallback({ error: error });
                    });
                }
            });
        }, error => {
            alert({
                title: "Backend operation failed",
                message: error.message,
                okButtonText: "Ok"
            });
        });
    }

    createAppointment(startDate: string, endDate: string) {
        const appointment = new Appointment({
            pd_appointment_uuid: "ef987691-0a19-447f-814d-f8f3abbf4859",
            appointment_id: this._generateId(),
            appointment_type: "OV1",
            patient: {
                "first_name": "John",
                "last_name": "Doe",
                "_uuid": "8b21f7b0-8535-11e4-a6cb-0800272e8da1",
                "phone": "800-555-1212",
                "member_id": "M000001",
                "birth_date": "1970-01-25",
                "email": "john@johndoe.com"
            },
            status: "booked",
            provider_scheduler_uuid: "8b21efa4-8535-11e4-a6cb-0800272e8da1",
            start_date: startDate,
            end_date: endDate
        });
        return this._appointmentService.create(appointment);
    }

    getProviderName(providerItem: Provider) {
        return providerItem.prefix + ' ' + providerItem.first_name + ' ' + providerItem.last_name;
    }

    getDayViewStyle(): CalendarDayViewStyle {
        const dayViewStyle = new CalendarDayViewStyle();
        dayViewStyle.showWeekNumbers = false;
        dayViewStyle.showDayNames = true;
        dayViewStyle.showTitle = true;

        return dayViewStyle;
    }

    getMonthViewStyle(): CalendarMonthViewStyle {
        const calendar = this.appointmentDayPicker.calendar;
        const monthViewStyle = new CalendarMonthViewStyle();
        monthViewStyle.backgroundColor = "white";
        monthViewStyle.showTitle = true;
        monthViewStyle.showWeekNumbers = false;
        monthViewStyle.showDayNames = true;
        monthViewStyle.selectionShape = "Round";
        monthViewStyle.selectionShapeSize = calendar.android ? 25 : 15;
        monthViewStyle.selectionShapeColor = "Red";

        const todayCellStyle = new DayCellStyle();
        todayCellStyle.cellBackgroundColor = "white";
        todayCellStyle.cellBorderWidth = 1;
        todayCellStyle.cellBorderColor = "transparent";
        todayCellStyle.cellTextColor = "blue";
        monthViewStyle.todayCellStyle = todayCellStyle;

        const dayCellStyle = new DayCellStyle();
        if (calendar.android) {
            dayCellStyle.cellAlignment = "Center"; // HACK: set an invalid value in Android to actually center the content
        }
        dayCellStyle.cellBackgroundColor = "white";
        dayCellStyle.cellBorderWidth = 1;
        dayCellStyle.cellBorderColor = "transparent";
        dayCellStyle.cellTextColor = "#745151";
        monthViewStyle.dayCellStyle = dayCellStyle;

        const selectedCellStyle = new DayCellStyle();
        selectedCellStyle.cellBorderWidth = 1;
        selectedCellStyle.cellBorderColor = "transparent";
        selectedCellStyle.cellTextColor = "white";
        monthViewStyle.selectedDayCellStyle = selectedCellStyle;

        return monthViewStyle;
    }

    formatDate(date: Date): string {
        const split = date.toDateString().split(" ");
        split.pop();
        return split.join(" ");
    }

	_formatDateTime(date: Date): string {
        const locale = "en-us";
        let hour = date.getHours();
        let minutes = date.getMinutes().toString();
        const pm = hour>=12 ? "PM" : "AM";

        if (hour>12) {
            hour-=12;
        }
        if (minutes.length === 1) {
			minutes = "0" + minutes;
		}

        let formattedDate = `${date.toLocaleDateString(locale)} at ${hour}:${minutes}${pm}`;
        return formattedDate;
    }

    _generateId(): string {
        // e.g. "UYQDUHSMIRCA"
        return "xxxxxxxxxxxx".replace(/x/g, () => { 
            const r = Math.floor(Math.random() * 26) + "A".charCodeAt(0);
            return String.fromCharCode(r);
        })
    }
}
