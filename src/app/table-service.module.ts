import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './Service/table.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [TableService],
})
export class TableServiceModule {}