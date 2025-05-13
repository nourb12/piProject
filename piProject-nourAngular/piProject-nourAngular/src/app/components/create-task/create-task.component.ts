import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: number;
  successMessage: string = '';

  recognition: any;
  isListening: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['PLANNED'] // default status
    });

    this.setupVoiceRecognition();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value, projectId: this.projectId };
      this.successMessage = `Task added successfully to project: ${this.projectId}`;

      this.taskService.createTask(taskData).subscribe(() => {
        this.router.navigate(['/list-project']);
      });
    }
  }

  // 🎤 Setup voice recognition
  setupVoiceRecognition(): void {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.ngZone.run(() => this.extractFromTranscript(transcript));
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      alert('Error details: ' + JSON.stringify(event));
      if (event.error === 'network') {
        alert('Network error: Please check your internet connection.');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert('Permission denied: Please allow microphone access.');
      } else {
        alert('Speech recognition failed: ' + event.error);
      }
    };
    

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startListening(): void {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
      this.recognition.onend = () => {
        this.isListening = false;
      };
      // Stop after 10 seconds (10000ms)
      setTimeout(() => {
        if (this.isListening) {
          this.recognition.stop();
          alert("Speech recognition timed out.");
        }
      }, 15000); // 10 seconds
    }
  }
  

  // 🧠 Extract info from transcript
  extractFromTranscript(transcript: string): void {
    const titleMatch = transcript.match(/called (.*?)\./i);
    const descMatch = transcript.match(/description is (.*?)\./i);
    const statusMatch = transcript.match(/status is (.*?)\./i);

    const title = titleMatch ? titleMatch[1] : '';
    const description = descMatch ? descMatch[1] : '';
    const statusRaw = statusMatch ? statusMatch[1].toLowerCase() : '';

    let status: 'PLANNED' | 'IN_PROGRESS' | 'DONE' = 'PLANNED';
    if (statusRaw.includes('progress')) {
      status = 'IN_PROGRESS';
    } else if (statusRaw.includes('done') || statusRaw.includes('complete')) {
      status = 'DONE';
    }

    this.taskForm.patchValue({ title, description, status });
  }
}
