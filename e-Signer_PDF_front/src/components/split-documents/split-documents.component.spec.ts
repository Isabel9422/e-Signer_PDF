import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitDocumentsComponent } from './split-documents.component';

describe('SplitDocumentsComponent', () => {
  let component: SplitDocumentsComponent;
  let fixture: ComponentFixture<SplitDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
