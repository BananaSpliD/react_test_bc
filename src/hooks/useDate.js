
    export const Date=(milliseconds,options)=>{
//        let options = { year: 'numeric', month: 'short', day: 'numeric' };

            let date = new Date(milliseconds); // create Date object
            return date.toLocaleDateString("es-ES",options);        
    };
   