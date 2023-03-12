import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/components/shared';
import { LayoutInitService } from 'src/app/services/core/layout-init.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class AdminSharedComponent implements OnInit {
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  // offcanvases
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    public routing: Router
  ) {
    this.initService.init();
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses =
      this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }
}
