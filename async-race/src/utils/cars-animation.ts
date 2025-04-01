export function startCar(car: SVGElement, velocity: number): void {
  const container = car.parentElement;
  if (container) {
    const containerWidth = container.getBoundingClientRect().width;
    const carWidth = car.getBoundingClientRect().width;
    const distance = containerWidth - carWidth;
    const time = distance / velocity;
    car.style.transform = `translateX(${distance}px)`;
    car.style.transition = `transform ${time}s linear`;
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
