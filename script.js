const $=s=>document.querySelector(s);
let rates={countries:[],panel_watt:580,sun_hours_assumption:4.5};
const defaults=[["Fan",75,2],["LED bulb",10,5],["Refrigerator",180,8],["Television",100,4],["Water motor",750,1],["Air conditioner",1200,5],["Laptop",65,5]];
const langNames=[["English","en"],["اردو","ur"],["العربية","ar"],["فارسی","fa"],["پښتو","ps"],["سنڌي","sd"],["Español","es"],["Français","fr"],["Deutsch","de"],["Português","pt"],["Italiano","it"],["Türkçe","tr"],["Bahasa Indonesia","id"],["Bahasa Melayu","ms"],["বাংলা","bn"],["हिन्दी","hi"],["中文","zh"],["日本語","ja"],["한국어","ko"],["Русский","ru"],["Kiswahili","sw"],["Nederlands","nl"],["ไทย","th"],["Tiếng Việt","vi"],["Filipino","fil"]];
async function init(){
 try{const response=await fetch("rates.json",{cache:"no-store"});if(!response.ok)throw new Error("Rates unavailable");rates=await response.json();}
 catch(error){console.warn(error);rates={panel_watt:580,sun_hours_assumption:4.5,countries:[{code:"US",name:"United States",currency:"USD",symbol:"$",cost_per_kw:0}]};}
 $("#country").innerHTML=rates.countries.map(c=>'<option value="'+c.code+'">'+c.name+'</option>').join("");
 $("#country").value=rates.countries.some(c=>c.code==="US")?"US":rates.countries[0]?.code||"";
 $("#language").innerHTML=langNames.map(([name,code])=>'<option value="'+code+'">'+name+'</option>').join("");
 $("#language").addEventListener("change",e=>setLanguage(e.target.value));
 $("#country").addEventListener("change",calculate);
 $("#safety").addEventListener("change",calculate);
 $("#appliances").addEventListener("input",calculate);
 $("#calculate").addEventListener("click",calculate);
 $("#addCustom").addEventListener("click",addCustom);
 $("#print").addEventListener("click",()=>window.print());
 $("#menuBtn").addEventListener("click",()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",String(open));});
 $("#mainNav").addEventListener("click",e=>{if(e.target.closest("a")){$("#mainNav").classList.remove("open");$("#menuBtn").setAttribute("aria-expanded","false");}});
 $("#year").textContent=new Date().getFullYear();
 renderAppliances();calculate();
}
function renderAppliances(){
 const box=$("#appliances");box.innerHTML="";
 defaults.forEach(([name,watts,hours])=>box.appendChild(makeAppliance(name,watts,hours,false)));
}
function makeAppliance(name,watts,hours,removable=true){
 const row=document.createElement("div");row.className="appliance";
 const label=document.createElement("label");label.textContent=name;
 const note=document.createElement("small");note.textContent="Watts";label.appendChild(note);
 const w=document.createElement("input");w.type="number";w.min="0";w.max="10000";w.step="1";w.value=watts;w.className="watts";w.setAttribute("aria-label",name+" watts");
 const h=document.createElement("input");h.type="number";h.min="0";h.max="24";h.step="0.5";h.value=hours;h.className="hours";h.setAttribute("aria-label",name+" hours per day");
 row.append(label,w,h);
 if(removable){const remove=document.createElement("button");remove.type="button";remove.className="remove-appliance";remove.textContent="×";remove.setAttribute("aria-label","Remove "+name);remove.addEventListener("click",()=>{row.remove();calculate();});row.appendChild(remove);}
 return row;
}
function addCustom(){const n=$("#appliances").querySelectorAll(".appliance").length+1;$("#appliances").appendChild(makeAppliance("Custom device "+n,100,2,true));calculate();}
function calculate(){
 let wh=0,valid=true;
 document.querySelectorAll(".appliance").forEach(row=>{
  const wattsInput=row.querySelector(".watts"),hoursInput=row.querySelector(".hours");
  const w=Number(wattsInput.value),h=Number(hoursInput.value);
  if(wattsInput.value===""||hoursInput.value===""||!Number.isFinite(w)||!Number.isFinite(h)||w<0||w>10000||h<0||h>24){valid=false;}
  wh+=Math.max(0,Math.min(10000,w||0))*Math.max(0,Math.min(24,h||0));
 });
 const daily=wh/1000,margin=$("#safety").checked?1.2:1,sun=Number(rates.sun_hours_assumption)||4.5,efficiency=0.8;
 const system=daily===0?0:daily/sun*margin/efficiency;
 const panelCount=system===0?0:Math.ceil(system*1000/(Number(rates.panel_watt)||580));
 const inverter=system===0?0:Math.ceil(system*10)/10;
 const country=rates.countries.find(c=>c.code===$("#country").value)||rates.countries[0]||{currency:"",symbol:"",cost_per_kw:0};
 const cost=Math.round(system*(Number(country.cost_per_kw)||0));
 $("#daily").textContent=daily.toFixed(2)+" kWh";
 $("#system").textContent=system.toFixed(2)+" kW";
 $("#panels").textContent=String(panelCount);
 $("#inverter").textContent=inverter.toFixed(1)+" kW";
 $("#cost").textContent=(country.symbol||country.currency||"")+" "+cost.toLocaleString(undefined,{maximumFractionDigits:0});
 $("#costNote").textContent=country.cost_per_kw?("Planning assumption: "+country.currency+" "+Number(country.cost_per_kw).toLocaleString()+" per kW. Not a live quote."): "No verified local price assumption is available for this market.";
 $("#calculate").setAttribute("aria-label",valid?"Estimate updated":"Check appliance values");
}
function setLanguage(code){
 const dict=window.translations?.data?.[code]||{};
 document.documentElement.lang=code;
 document.documentElement.dir=["ur","ar","fa","ps","sd"].includes(code)?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const value=dict[el.dataset.i18n];if(value)el.textContent=value;});
}
document.addEventListener("DOMContentLoaded",init);