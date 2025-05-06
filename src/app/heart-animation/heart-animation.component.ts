
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-heart-animation',
  templateUrl: './heart-animation.component.html',
  styleUrls: ['./heart-animation.component.css']
})
export class HeartAnimationComponent implements AfterViewInit {

  @Output() animationDone = new EventEmitter<void>();
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const origin = { x: canvas.width / 2, y: canvas.height / 2 };

    // ▶️ Son magique
    const audio = document.querySelector('audio');
    if (audio) {
      audio.play().catch((e) => console.warn('Erreur audio', e));
    }

    function polar(rad: number, time: number) {
      rad += Math.sin(time / 100);
      const x = 16 * Math.sin(rad) ** 3;
      const y =
        13 * Math.cos(rad) -
        5 * Math.cos(2 * rad) -
        2 * Math.cos(3 * rad) -
        Math.cos(4 * rad);
      const scale = (Math.sin(time / 10) + 3) * 4;
      return {
        x: x * scale + origin.x,
        y: -y * scale + origin.y
      };
    }

    let time = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 1000; i++) {
        const rad = (i / 1000) * 2 * Math.PI;
        const point = polar(rad, time);
        ctx.fillStyle = 'red';
        ctx.fillRect(point.x, point.y, 2, 2);
      }
      time += 1;
      requestAnimationFrame(animate);
    }

    animate();

    // ⏱️ Après 2s, on cache le composant
    setTimeout(() => {
      this.animationDone.emit();
    }, 4000);
  }
}
