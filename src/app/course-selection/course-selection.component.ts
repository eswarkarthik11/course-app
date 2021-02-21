import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      timeSlots: ['8 Am', '11 Am']
    },
    {
      name: "Trignometry",
      timeSlots: ['9 Am', '12 Pm']
    },
    {
      name: "Calculus",
      timeSlots: ['10 Am', '3 Pm']
    }],
  },
  {
    subject: "Science",
    topics: [{
      name: "Physics",
      timeSlots: ['10 Am', '3 Pm']
    },
    {
      name: "Chemistry",
      timeSlots: ['9 Am', '1 Pm']
    },
    {
      name: "Biology",
      timeSlots: ['8 Am', '10 Am']
    }],
  },
  {
    subject: "Art",
    topics: [{
      name: "Art History",
      timeSlots: ['11 Am']
    },
    {
      name: "Painting",
      timeSlots: ['2 Pm']
    },
    {
      name: "Drawing",
      timeSlots: ['8 Am', '5 Pm']
    }],
  },
  {
    subject: "Language Arts",
    topics: [{
      name: "Literature",
      timeSlots: ['8.30 Am', '11.45 Am']
    },
    {
      name: "Grammar",
      timeSlots: ['8 Am', '9 Am', '10 Am', '11 Am', '1 Pm']
    },
    {
      name: "Writing",
      timeSlots: ['8 Am', '11 Am']
    }],
  }];
  public selectedSubjectTopics: Array<{name: string, timeSlots: Array<string>}>;
  public selectedTopicTimeSlots: Array<string>;
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
      'userName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'studentId': new FormControl(null, Validators.required),
      'classSubject': new FormControl(),
      'classTopic': new FormControl(),
      'classTimeSlot': new FormControl(),
    });

    this.selectedClassSchedules.push({ subject: 'psych', topic: '101', timeSlot: '7' })
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
  
  public submit(): void {
    if(!this.courseSelectionForm.valid) {
      return;
    }
    this.selectedClassSchedules.push({
      subject: this.selectedSubject,
      topic: this.selectedTopic,
      timeSlot: this.selectedTimeSlot, 
    });

    this.table.renderRows();
    this.clearForm();
    console.log(this.selectedClassSchedules);
  }

  private clearForm() {
    // this.selectedSubjectTopics: Array<{name: string, timeSlots: Array<string>}>;
    // this.selectedTopicTimeSlots: Array<string>;
    this.selectedSubject = '';
    this.selectedTopic = '';
    this.selectedTimeSlot = '';
  }
}
