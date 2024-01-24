import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPageComponent } from './pages/main/editor-page/editor-page.component';
import { RailroadinkPageComponent } from './pages/other/railroadink-page/railroadink-page.component';
import { NotFoundPageComponent } from './pages/main/error-pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/main/home-page/home-page.component';
import { ApplicationPageComponent } from './pages/main/application-page/application-page.component';
import { AdflyPageComponent } from './pages/other/adfly-page/adfly-page.component';
import { MessagePageComponent } from './pages/other/message-page/message-page.component';
import { ProjectGalleryPageComponent } from './pages/other/project-gallery-page/project-gallery-page.component';
import { ContentPlayerPageComponent } from './pages/other/content-player-page/content-player-page.component';
import { TestingPageComponent } from './pages/other/testing-page/testing-page.component';
import { RandomDisplayPageComponent } from './pages/other/random-display-page/random-display-page.component';
import { FunkyCssPageComponent } from './pages/other/funky-css-page/funky-css-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/Home' },
    { path: 'Home', component: HomePageComponent },
    { path: 'Editor', component: EditorPageComponent },
    { path: 'Railroad', component: RailroadinkPageComponent },
    { path: 'AdBee', component: AdflyPageComponent },
    { path: 'Chat', component: MessagePageComponent },
    { path: 'Projects', component: ProjectGalleryPageComponent },
    { path: 'Player', component: ContentPlayerPageComponent },
    { path: 'Test', component: TestingPageComponent },
    { path: 'ItemDisplay', component: RandomDisplayPageComponent },
    { path: 'FunkyCSS', component: FunkyCssPageComponent },
    //   { path: 'Store/Category/:View', component: StorePageComponent },
    //   { path: 'Datapage', component: DataPageComponent },

    { path: '404', component: NotFoundPageComponent },
    { path: '**', component: NotFoundPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
