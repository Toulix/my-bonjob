import { DownloadService } from './../../../../core/services/download.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'candidates-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
    
  }
 
}
