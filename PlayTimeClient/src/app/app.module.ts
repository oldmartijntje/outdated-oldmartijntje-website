import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastPopupComponent } from './components/global/toast-popup/toast-popup.component';
import { AngularSplitModule } from 'angular-split';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';

@NgModule({
    declarations: [
        AppComponent,
        ToastPopupComponent,
        EditorPageComponent
    ],
    imports: [
        BrowserModule,
        AngularSplitModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
