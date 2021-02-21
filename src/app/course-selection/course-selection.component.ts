import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  public courseSelectionForm: FormGroup;
  public classSchedule = [{
    subject: "Math",
    topics: [{
      name: "Algebra",
      timeSlots: ['8:00 Am', '11:00 Am']
    },
    {
      name: "Trignometry",
      timeSlots: ['9:00 Am', '12:00 Pm']
    },
    {
      name: "Calculus",
      timeSlots: ['10:00 Am', '3:00 Pm']
    }],
  },
  {
    subject: "Science",
    topics: [{
      name: "Physics",
      timeSlots: ['10:00 Am', '3:00 Pm']
    },
    {
      name: "Chemistry",
      timeSlots: ['9:00 Am', '1:00 Pm']
    },
    {
      name: "Biology",
      timeSlots: ['8:00 Am', '10:00 Am']
    }],
  },
  {
    subject: "Art",
    topics: [{
      name: "Art History",
      timeSlots: ['11:00 Am']
    },
    {
      name: "Painting",
      timeSlots: ['2:00 Pm']
    },
    {
      name: "Drawing",
      timeSlots: ['8:00 Am', '5:00 Pm']
    }],
  },
  {
    subject: "Language Arts",
    topics: [{
      name: "Literature",
      timeSlots: ['8:30 Am', '11:45 Am']
    },
    {
      name: "Grammar",
      timeSlots: ['8:00 Am', '9:00 Am', '10:00 Am', '11:00 Am', '1:00 Pm']
    },
    {
      name: "Writing",
      timeSlots: ['8:00 Am', '11:00 Am']
    }],
  }];
  public selectedSubjectTopics: Array<{name: string, timeSlots: Array<string>}>;
  public selectedTopicTimeSlots: Array<string>;
  public userName: string;
  public email: string;
  public studentId: string;
  public selectedSubject: string;
  public selectedTopic: string;
  public selectedTimeSlot: string;
  public selectedClassSchedules = new Array<{subject: string, topic: string, timeSlot: string}>();
  public displayedColumns: string[] = ['subject', 'topic', 'timeSlot'];

  constructor() { 
  }

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.courseSelectionForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]),
      'email': new FormControl(null, Validators.required),
      'studentId': new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]),
      'classSubject': new FormControl("", Validators.required),
      'classTopic': new FormControl("", Validators.required),
      'classTimeSlot': new FormControl("", Validators.required),
    });
  }

  public onSubjectSelectionChanged(classSchedule: any): void {
    this.selectedSubject = classSchedule.value.subject;
    this.selectedSubjectTopics = classSchedule.value.topics;
  }

  public onTopicSelectionChanged(classTopic: any): void {
    this.selectedTopic = classTopic.value.name;
    this.selectedTopicTimeSlots = classTopic.value.timeSlots;
  }

  public onTimeSlotSelectionChanged(timeSlot: any): void {
    this.selectedTimeSlot = timeSlot.value;
  }
  
  public onFormSubmitted(form: FormGroupDirective): void {
    if(this.courseSelectionForm.invalid) {
      return;
    }

    if(this.userName !== this.courseSelectionForm.get('userName').value || this.email !== this.courseSelectionForm.get('email').value ||
        this.studentId !== this.courseSelectionForm.get('studentId').value) {
      this.selectedClassSchedules = [];
    }

    this.selectedClassSchedules.push({
      subject: this.selectedSubject,
      topic: this.selectedTopic,
      timeSlot: this.selectedTimeSlot, 
    });

    this.sortSelectedClassSchedules();
    this.table?.renderRows();

    this.resetCourseSelectionForm(form);
  }

  private sortSelectedClassSchedules(): void {
    this.selectedClassSchedules.sort((a, b) => {
      return this.convertTimeToMinutes(a.timeSlot) - this.convertTimeToMinutes(b.timeSlot);
    });
  }

  public canSelectTime(time: string): boolean {
    if(!this.selectedClassSchedules.length) {
      return true;
    }
    const existingScheduleTimes = this.selectedClassSchedules.map(x => this.convertTimeToMinutes(x.timeSlot));
    let timeInMinutes = this.convertTimeToMinutes(time);
    const atleastOneTimeSlotIsInRange = existingScheduleTimes.some(t => Math.abs(t - timeInMinutes) < 60);
    return !atleastOneTimeSlotIsInRange;
  }  

  private convertTimeToMinutes(time12h: string): number {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
    let convertedHours = 0;
  
    if (hours === '12') {
      convertedHours = 0;
    }
  
    if (modifier === 'Pm') {
      convertedHours = parseInt(hours, 10) + 12;
    }
  
    return (convertedHours || parseInt(hours, 10))*60 + parseInt(minutes, 10);
}

  private resetCourseSelectionForm(form: FormGroupDirective): void {
    this.userName = this.courseSelectionForm.get('userName').value;
    this.email = this.courseSelectionForm.get('email').value;
    this.studentId = this.courseSelectionForm.get('studentId').value;

    form.resetForm();
    this.courseSelectionForm.reset();

    this.courseSelectionForm.patchValue({
      userName: this.userName,
      email: this.email,
      studentId: this.studentId,
      classSubject: '',
      classTopic: '',
      classTimeSlot: '',
    });

    this.selectedSubjectTopics = [];
    this.selectedTopicTimeSlots = [];
  }
}
