interface page {
  name: String;
  status: Boolean;
  baseTime: number;
}

import Timer from "@/class/timer";

export module timer {
  export class Boucle {
    event: CustomEvent;
    listPages: Array<page> = [
      { name: "flux", status: false, baseTime: 30000 },
      { name: "prog", status: false, baseTime: 15000 },
      { name: "orga", status: false, baseTime: 10000 },
      { name: "waiting", status: true, baseTime: 20000 },
    ];
    index: any;
    timer: Timer;
    oldIndex: number;

    constructor() {
      this.event = new CustomEvent("changePage", {
        detail: {},
        bubbles: true,
        cancelable: true,
      });

      this.oldIndex = 0;
      this.index = this.listPages.findIndex((elem) => elem.status === true);
      this.timer = new Timer(this.boucle, 2000);
    }

    private incrementIndex = () => {
      if (this.index < this.listPages.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    };

    private boucle = () => {
      this.oldIndex = this.index;
      const index = this.index;
      const page = this.listPages[index];

      console.log(page.name, index, page.baseTime, page.status);

      this.incrementIndex();
      while (this.listPages[this.index].status !== true) {
        this.incrementIndex();
      }

      this.sendEvent(this.listPages[index]);

      this.timer = new Timer(this.boucle, this.listPages[index].baseTime);
    };

    private createEvent = (pageInfo: page) => {
      return new CustomEvent("changePage", {
        detail: pageInfo.name,
        bubbles: true,
        cancelable: true,
      });
    };

    private sendEvent = (pageInfo: page) => {
      this.event = this.createEvent(pageInfo);
      document.dispatchEvent(this.event);
    };

    changeProps = (name: String, status?: Boolean, time?: number) => {
      const pageToChange = this.listPages.findIndex(
        (element) => element.name === name
      );
      if (status) {
        this.listPages[pageToChange].status = status;
      }

      if (time) {
        this.listPages[pageToChange].baseTime = time;
      }
    };

    stopTimer = () => {
      this.timer.pause();
    };

    resume = () => {
      this.timer.resume();
    };

    getEvent = () => {
      return this.event;
    };

    noMoreFlux = () => {
      console.log('coucou nomoreflux');
      this.stopTimer();
      this.timer = new Timer(this.boucle, 5000);
      this.listPages[0].status = false;
    }

    newFlux = () => {
      console.log(this.oldIndex);
      if(this.oldIndex === 0){
        this.timer.addTime(10000);
      }
      this.listPages[0].status = true;
    }
  }
}
