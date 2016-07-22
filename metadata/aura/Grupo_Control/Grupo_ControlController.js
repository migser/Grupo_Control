({
	inicio : function(component, event, helper) {
        
		helper.getCampana(component, component.get("v.recordId"));
      //  debugger;
        console.log("Ya sacamos la campaña: "+ component.get("v.campana.Name"))
	},
    
    grupo : function(component, event, helper) {
        
		helper.setGrupo(component,component.get("v.recordId"),component.get("v.campana.Grupo_Control__c"));
      //  debugger;
        console.log("Creamos el grupo! ");
	}
})