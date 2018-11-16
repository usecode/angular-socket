import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { Document } from '../document';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  public document: Document
  private _docSub: Subscription;
  public registerForm: FormGroup;
  constructor(private documentService: DocumentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

    this._docSub = this.documentService.currentDocument
      .pipe(
        startWith({ id: '', doc: 'Select an existing document or create a new one to get started'})
      )
      .subscribe(document => this.document = document);
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      text: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}