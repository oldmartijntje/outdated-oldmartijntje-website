import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPageComponent } from './pages/main/editor-page/editor-page.component';
import { RailroadinkPageComponent } from './pages/other/railroadink-page/railroadink-page.component';
import { NotFoundPageComponent } from './pages/main/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/main/home-page/home-page.component';
import { BookmarksPageComponent } from './pages/other/bookmarks-page/bookmarks-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/Pages' },
    { path: 'Home', component: HomePageComponent },
    { path: 'Editor', component: EditorPageComponent },
    { path: 'Railroad', component: RailroadinkPageComponent },
    { path: 'Pages', component: BookmarksPageComponent },
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
