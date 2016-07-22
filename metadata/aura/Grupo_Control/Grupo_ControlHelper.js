({
	getCampana : function(component, campanaId) {
        var action = component.get("c.getCampana");
	//	debugger;
		action.setParams({
			campanaId: campanaId
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
    
    setGrupo : function(component, campanaId, pct) {
        var action = component.get("c.setGrupo");
        action.setParams ({
            campanaId: campanaId,
            pct: pct
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
    }
})