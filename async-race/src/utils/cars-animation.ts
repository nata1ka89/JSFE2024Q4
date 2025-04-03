export function startCar(car: SVGElement, velocity: number, distance: number): number | undefined {
  const container = car.parentElement;
  if (container) {
    const containerWidth = container.getBoundingClientRect().width;
    const carWidth = car.getBoundingClientRect().width;
    const distanceWidth = containerWidth - carWidth;
    const scale = 900;
    const time = distance / (velocity * scale);
    car.style.transform = `translateX(${distanceWidth}px)`;
    car.style.transition = `transform ${time}s linear`;
    return time;
  }
}

export function stopCar(car: SVGElement): void {
  const rect = car.getBoundingClientRect();
  car.style.transform = `translateX(${rect.left}px)`;
  car.style.transition = '';
}

export function returnCar(car: SVGElement): void {
  car.style.transform = `translateX(0px)`;
  car.style.transition = '';
}
