({
	getCampana : function(component, campanaId, cg_pct) {
        var action = component.get("c.getCampana");
	//	debugger;
		action.setParams({
			campanaId: campanaId,
			cg_pct: cg_pct
		});
		
		action.setCallback(this, function(actionResult){
            console.log("**Estado: "+actionResult.state);
            
			if(actionResult.state == 'SUCCESS'){
					component.set("v.campana", actionResult.getReturnValue());
                    console.log("Estado es Success!!!!");
				
			}
		});

		$A.enqueueAction(action);
		
	},
    
    setGrupo : function(component, campanaId, pct, cg_pct, cg_check) {
        var action = component.get("c.setGrupo");
        action.setParams ({
            campanaId: campanaId,
            pct: pct,
            cg_pct: cg_pct,
            cg_check: cg_check
        });
        
        action.setCallback(this, function(actionResult){
            
			if(actionResult.state == 'SUCCESS'){
                 component.set("v.grupo",true);
                 var outputval = component.find("grupo_size");
        		 outputval.set("v.value", actionResult.getReturnValue());
               
                    console.log("Grupo Creado!!!!");
				
			}
		});
        
        $A.enqueueAction(action);
    },
    setIdiomaAux : function (component, idioma) {
    	console.log("Configurando Etiquetas");
    	if ( idioma == 'es') {
    		component.set("v.input_size_lbl","Grupo de Control");
    		component.set("v.input_pct_lbl","Grupo de Control (en %)");
    		component.set("v.button_lbl","Generar Grupo de Control");

    	} else if (idioma =='en') {
    		component.set("v.input_size_lbl","Control Group");
    		component.set("v.input_pct_lbl","Control Group (in %)");
    		component.set("v.button_lbl","Generate Control Group");
   		 }
	},

    setIdioma : function (component, idioma) {

    	console.log("Detectando Idiona!");
    	if ( idioma == 'Spanish') {
    		this.setIdiomaAux(component,"es");

    	} else if (idioma =='English') {
    		this.setIdiomaAux(component,"en");
    		
    	} else {
    		var action = component.get("c.getUserLanguage");
    		action.setCallback(this, function(actionResult){
    			if(actionResult.state == 'SUCCESS'){
    				this.setIdiomaAux(component,actionResult.getReturnValue())
    			}

    		});

		$A.enqueueAction(action);

    	}
    }
})