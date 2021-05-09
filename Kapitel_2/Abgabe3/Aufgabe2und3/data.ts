"use strict";
namespace Abgabe2_3Aufgabe2 {
    export let topHead: DBType[] = [];
    export let midBody: DBType[] = [];
    export let botLegs: DBType[] = [];
    // Head Selections
    let head1: DBType = {link: "assets/vegetaHead.png", type: 0};
    let head2: DBType = {link: "assets/android18Head.png", type: 0};
    let head3: DBType = {link: "assets/jirenHead.png", type: 0};
    // Body Selections
    let body1: DBType = {link: "assets/vegetaBody.png", type: 1};
    let body2: DBType = {link: "assets/android18Body.png", type: 1};
    let body3: DBType = {link: "assets/jirenBody.png", type: 1};
    // Leg Selections
    let legs1: DBType = {link: "assets/vegetaLegs.png", type: 2};
    let legs2: DBType = {link: "assets/android18Legs.png", type: 2};
    let legs3: DBType = {link: "assets/jirenLegs.png", type: 2};
    topHead.push(head1);
    topHead.push(head2);
    topHead.push(head3);
    midBody.push(body1);
    midBody.push(body2);
    midBody.push(body3);
    botLegs.push(legs1);
    botLegs.push(legs2);
    botLegs.push(legs3);
}