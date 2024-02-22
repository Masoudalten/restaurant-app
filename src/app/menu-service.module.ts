import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './Service/menu.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [MenuService],
})
export class MenuServiceModule {}