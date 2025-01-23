import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeDocumentsComponent } from './merge-documents.component';

describe('MergeDocumentsComponent', () => {
  let component: MergeDocumentsComponent;
  let fixture: ComponentFixture<MergeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
