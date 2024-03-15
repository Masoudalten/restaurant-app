import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Order } from '../Model/Order';
import { OrderService } from '../Service/order.service';
import { of, switchMap } from 'rxjs';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip: string | undefined;

  private tooltipElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private orderService: OrderService) {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background-color', 'black');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '999');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    this.renderer.setStyle(this.tooltipElement, 'width', '140px');

    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);
  }

  @HostListener('mouseenter', ['$event.target']) onMouseEnter(target: any) {
    const tableNumber = target.getAttribute('data-table-number');
    if (tableNumber) {
      this.orderService.getOrders().pipe(
        switchMap((orders: Order[]) => {
          const order = orders.find(order => order.orderItems[0].tNumber == tableNumber);
          return order ? of(order) : of(undefined as Order | undefined);
        })
      ).subscribe(
        (order: Order | undefined) => {
          if (order) {
            const tooltipContents: string[] = [];
            tooltipContents.push(`Time: ${order.time}`);
            tooltipContents.push(`OrderId: ${order.orderId}`);
            const tooltipContent = tooltipContents.join('\n')
            this.renderer.setStyle(this.tooltipElement, 'display', 'block');
            this.renderer.setProperty(this.tooltipElement, 'textContent', tooltipContent);
          } else {
            this.renderer.setStyle(this.tooltipElement, 'display', 'none');
          }
        },
        error => {
          console.log('Error loading orders', error);
        }
      );
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }
}



