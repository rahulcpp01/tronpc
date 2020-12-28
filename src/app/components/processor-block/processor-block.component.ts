import { Component, Input, OnInit } from '@angular/core';
import { Processor } from 'src/models/custommodels/processor.model';

@Component({
  selector: 'processor-block',
  templateUrl: './processor-block.component.html',
  styleUrls: ['./processor-block.component.scss']
})
export class ProcessorBlockComponent implements OnInit {

  @Input() processor: Processor={};
  constructor() { }

  ngOnInit(): void {
  }

}
