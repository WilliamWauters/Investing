class CalculateAankoop {
  VL = (aankoopbedrag, abattement, beschrijf) => {
    //console.log('bereken nu', aankoopbedrag, abattement, beschrijf);
    let registratierechten = 0
    let ereloon = 0
    let btw = {
      min: 0,
      max: 0
    }
    let administratievekosten = {
      min: 750,
      max: 750
    }
    let overschrijvingskosten = 240
    let totaal = {
      min: 0,
      max: 0
    }

    let type
    let type2 = "E"



    switch(abattement){
    case "regular":   type = "A"
      break
    case "high":      type = "B"
      break
    case "none":      type = "C"
      break
    default:          type = "A"
      break
    }
    if(beschrijf){
      type2 = "D"
    }

    //// REGISTRATIE RECHTEN

    if(type2 === "D"){
      if(type === "A"){
        registratierechten = (aankoopbedrag - 15000) * .05
      }else if(type === "B"){
        registratierechten = (aankoopbedrag - 35000) * .05
      }else{
        registratierechten = aankoopbedrag * .05
      }
    }else{
      if(type === "A"){
        registratierechten = (aankoopbedrag - 15000) * 0.10
      }else if(type === "B"){
        registratierechten = (aankoopbedrag - 25000) * 0.10
      }else{
        registratierechten = aankoopbedrag * 0.10
      }
    }

    registratierechten = Math.max(registratierechten, 50.00)


    //// ERELONEN
    ereloon = this.ereloon(aankoopbedrag, true)

    //// BTW
    btw.min = (ereloon + administratievekosten.min) * .21
    btw.max = (ereloon + administratievekosten.max) * .21

    //// totaal

    totaal.min = registratierechten + ereloon + overschrijvingskosten + administratievekosten.min + btw.min
    totaal.max = registratierechten + ereloon + overschrijvingskosten + administratievekosten.max + btw.max

    return {
      registratierechten: registratierechten,
      ereloon: ereloon,
      administratievekosten: administratievekosten,
      overschrijvingskosten: overschrijvingskosten,
      btw: btw,
      totaal: totaal
    }
  }

    VL_JUNI = (aankoopbedrag, woningBouwgrond, enigewoning, kernstad, meeneembaarActive, meeneembaar, bouwgrondEreloon) => {
      console.log("bereken juni", aankoopbedrag, woningBouwgrond, enigewoning, kernstad, meeneembaarActive, meeneembaar, bouwgrondEreloon)

      let registratierechten = 0
      let bijlagen = 100
      let ereloon = 0
      let btw = {
        min: 0,
        max: 0
      }
      let administratievekosten = {
        min: 750,
        max: 750
      }
      let derden = 262
      let overschrijvingskosten = 240
      let geschriften  = 100
      let totaal = {
        min: 0,
        max: 0
      }

      let type = "A"
      let type2 = "C"
      let type3 = "E"
      let type4 = "AA"

      if(woningBouwgrond === "Woning"){
        type3 = "E"
      }else{
        type3 = "F"
      }

      if(enigewoning === "no"){
        type = "B"
      }
      if(kernstad === "no"){
        type2 = "D"
      }
      if(bouwgrondEreloon === "no"){
        type4 = "BB"
      }

      if(type3 === "E"){
        if(type === "A"){
          if(type2 === "C"){
            if(aankoopbedrag > 240000){
              console.log("E A C > 3%")
              registratierechten = aankoopbedrag * .03
            }else{
              console.log("E A C < 3%")
              registratierechten = (aankoopbedrag * 0.03) - 2800
            }
          }else{
            if(aankoopbedrag > 220000){
              console.log("E A > 3%")
              registratierechten = aankoopbedrag * .03
            }else{
              console.log("E A < 3%")
              registratierechten = (aankoopbedrag * 0.03) - 2800
            }
          }
        }else{
          console.log("E 12%")
          registratierechten = aankoopbedrag * .12
        }
      }else{
        console.log("!E 12%")
        registratierechten = aankoopbedrag * .12
      }

      registratierechten = Math.max(registratierechten, 50.00)

      if(meeneembaarActive && meeneembaar > 0){
        //calculate meeneembaarheid
        registratierechten = registratierechten - meeneembaar
        if(registratierechten < 0){
          registratierechten = 0
        }
      }

      //// ERELONEN
      let isJbisBarema = true
      if ((type3 === "E" && type === "B") || (type3 === "F" && type4 === "BB")) {
        isJbisBarema = false
      }
      ereloon = this.ereloon(aankoopbedrag, isJbisBarema)

      //// BTW
      btw.min = (ereloon + administratievekosten.min + derden + geschriften) * .21
      btw.max = (ereloon + administratievekosten.max + derden + geschriften) * .21

      //// totaal

      totaal.min = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.min + btw.min
      totaal.max = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.max + btw.max

      return {
        registratierechten: registratierechten,
        bijlagen: bijlagen,
        ereloon: ereloon,
        administratievekosten: administratievekosten,
        derden: derden,
        overschrijvingskosten: overschrijvingskosten,
        geschriften: geschriften,
        btw: btw,
        totaal: totaal
      }
    }


    BXL = (aankoopbedrag, abattement, beschrijf, woningBouwgrond, enigewoning, bouwgrondEreloon) => {
      let registratie_perc = .125


      let registratierechten = aankoopbedrag * registratie_perc
      let bijlagen = 100
      let ereloon = 0
      let btw = {
        min: 0,
        max: 0
      }
      let administratievekosten = {
        min: 750,
        max: 750
      }
      let derden = 262
      let overschrijvingskosten = 240
      let geschriften  = 100
      let totaal = {
        min: 0,
        max: 0
      }

      let type = "A"
      let type3 = "E"
      let type4 = "AA"

      if(enigewoning === "no"){
        type = "B"
      }
      if(woningBouwgrond === "Woning"){
        type3 = "E"
      }else{
        type3 = "F"
      }
      if(bouwgrondEreloon === "no"){
        type4 = "BB"
      }

      //// REGISTRATIERECHTEN

      if(abattement === "regular_bxl" && aankoopbedrag <= 500000){
        registratierechten -= 21875
        if(aankoopbedrag <= 175000){
          registratierechten = 50
        }
      }else{
        registratierechten = Math.max(registratierechten, 50.00)
      }

      //// ERELONEN
      let isJbisBarema = true
      if ((type3 === "E" && type === "B") || (type3 === "F" && type4 === "BB")) {
        isJbisBarema = false
      }
      ereloon = this.ereloon(aankoopbedrag, isJbisBarema)

      //// BTW
      btw.min = (ereloon + administratievekosten.min + derden + geschriften) * .21
      btw.max = (ereloon + administratievekosten.max + derden + geschriften) * .21

      //// totaal

      totaal.min = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.min + btw.min
      totaal.max = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.max + btw.max

      return {
        registratierechten: registratierechten,
        bijlagen: bijlagen,
        ereloon: ereloon,
        administratievekosten: administratievekosten,
        derden: derden,
        overschrijvingskosten: overschrijvingskosten,
        geschriften: geschriften,
        btw: btw,
        totaal: totaal
      }
    }

    WL = (aankoopbedrag, abattement, bescheiden, derde, woningBouwgrond, enigewoning, bouwgrondEreloon) => {

      //console.log("abattement", abattement);
      let registratie_perc = .125


      let registratierechten = 0
      let bijlagen = 100
      let ereloon = 0
      let btw = {
        min: 0,
        max: 0
      }
      let administratievekosten = {
        min: 750,
        max: 750
      }
      let derden = 262
      let overschrijvingskosten = 240
      let geschriften  = 100
      let totaal = {
        min: 0,
        max: 0
      }

      let original_aankoopbedrag = aankoopbedrag

      let typeEni = "A"
      let type3 = "E"
      let type4 = "AA"

      if(enigewoning === "no"){
        typeEni = "B"
      }
      if(woningBouwgrond === "Woning"){
        type3 = "E"
      }else{
        type3 = "F"
      }
      if(bouwgrondEreloon === "no"){
        type4 = "BB"
      }

      //// REGISTRATIERECHTEN

      let atype = ""
      let type = ""

      if(abattement === "regular_wl"){
        atype = "A"
      }else{
        atype = "B"
      }

      if(bescheiden === "yes_inside"){
        type = "C"
      }else if(bescheiden === "yes_outside"){
        type = "D"
      }else{
        type = "E"
      }

      if(atype === "A"){
        if(type === "E"){
          registratierechten = (aankoopbedrag - 20000) * registratie_perc
        }else{
          aankoopbedrag -= 20000
        }
      }

      //console.log('type', atype, type, aankoopbedrag);

      if(!(atype === "A" && type === "E")){
        if(type === "C"){
          if(aankoopbedrag > 195049.46){
            registratierechten = (195049.46 * .06) + (registratie_perc * (aankoopbedrag - 195049.46))
            registratierechten = Math.max(registratierechten, 50.00)
          }else{
            registratierechten = (((aankoopbedrag * .06) + .005) * 100) / 100
            registratierechten = Math.max(registratierechten, 24.79)
          }
        }
        if(type === "D"){
          if(aankoopbedrag >  182858.86){
            registratierechten = (182858.86 * .06) + (registratie_perc * (aankoopbedrag - 182858.86))
            registratierechten = Math.max(registratierechten, 50.00)
          }else{
            registratierechten = (((aankoopbedrag * .06) + .005) * 100) / 100
            registratierechten = Math.max(registratierechten, 24.79)
          }
        }
        if(type === "E"){
          registratierechten = (((aankoopbedrag * registratie_perc) + 0.005) * 100) / 100
          registratierechten = Math.max(registratierechten, 50.00)
        }
      }

      registratierechten = this.formatItWrong(registratierechten)

      //// ERELONEN
      let isJbisBarema = true
      if ((type3 === "E" && typeEni === "B") || (type3 === "F" && type4 === "BB")) {
        isJbisBarema = false
      }

      ereloon = this.ereloon(original_aankoopbedrag, isJbisBarema)


      // console.log("registratierechten", registratierechten)



      //// BTW
      btw.min = (ereloon + administratievekosten.min + derden + geschriften) * .21
      btw.max = (ereloon + administratievekosten.max + derden + geschriften) * .21

      //// totaal

      totaal.min = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.min + btw.min
      totaal.max = registratierechten + ereloon + overschrijvingskosten + derden + geschriften + bijlagen + administratievekosten.max + btw.max

      return {
        registratierechten: registratierechten,
        bijlagen: bijlagen,
        ereloon: ereloon,
        administratievekosten: administratievekosten,
        derden: derden,
        overschrijvingskosten: overschrijvingskosten,
        geschriften: geschriften,
        btw: btw,
        totaal: totaal
      }
    }

    formatItWrong = (value) => {
      value = String(parseFloat(value).toFixed(2))
      value = value.replace(".01",".00")
      value = parseFloat(value)
      return value
    }

    ereloon = (aankoopbedrag, isJbisBarema) => {
      var ereloon
      if (isJbisBarema) {
        ereloon = (Math.min(aankoopbedrag,  7500.00) * 2.50 / 100) + 225
        if (aankoopbedrag> 7500.00)    {ereloon=ereloon+(Math.min(aankoopbedrag, 17500.00)- 7500.00)  * 2.50 / 100}
        if (aankoopbedrag> 17500.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 30000.00)-17500.00)  * 2.00 / 100}
        if (aankoopbedrag> 30000.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 45495.00)-30000.00)  * 1.50 / 100}
        if (aankoopbedrag> 45495.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 64090.00)-45495.00)  * 0.50 / 100}
        if (aankoopbedrag> 64090.00)   {ereloon=ereloon+(Math.min(aankoopbedrag,250095.00)-64090.00)  * 0.485 / 100}
        if (aankoopbedrag> 250095.00)  {ereloon=ereloon+(Math.min(aankoopbedrag,500000.00)-250095.00) * 0.30 / 100}
        if (aankoopbedrag> 500000.00)  {ereloon=ereloon+(aankoopbedrag-500000.00)                     * 0.20 / 100}
      } else {
        ereloon = (Math.min(aankoopbedrag,  7500.00) * 2.50 / 100) + 250
        if (aankoopbedrag> 7500.00)    {ereloon=ereloon+(Math.min(aankoopbedrag, 17500.00)- 7500.00)  * 2.50 / 100}
        if (aankoopbedrag> 17500.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 30000.00)-17500.00)  * 1.75 / 100}
        if (aankoopbedrag> 30000.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 45495.00)-30000.00)  * 1.71 / 100}
        if (aankoopbedrag> 45495.00)   {ereloon=ereloon+(Math.min(aankoopbedrag, 64090.00)-45495.00)  * 1.14 / 100}
        if (aankoopbedrag> 64090.00)   {ereloon=ereloon+(Math.min(aankoopbedrag,250095.00)-64090.00)  * 0.57 / 100}
        if (aankoopbedrag> 250095.00)  {ereloon=ereloon+(Math.min(aankoopbedrag,500000.00)-250095.00) * 0.20 / 100}
        if (aankoopbedrag> 500000.00)  {ereloon=ereloon+(aankoopbedrag-500000.00)                     * 0.20 / 100}
      }

      ereloon = Math.max(ereloon,8.48)

      if (aankoopbedrag < 20001.00){
        ereloon = ereloon - 75
      }

      return parseInt((ereloon+0.005)*100,10)/100
    }
}

export default CalculateAankoop



// WEBPACK FOOTER //
// ./src/services/CalculateAankoop.js