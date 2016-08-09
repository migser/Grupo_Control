({
	inicio : function(component, event, helper) {
        console.log("Iniciando");
        helper.setIdioma(component, component.get("v.language"));
		helper.getCampana(component, component.get("v.recordId"), component.get("v.cg_pct"));
      //  debugger;
        console.log("Ya sacamos la campaña: "+ component.get("v.campana.Name"));
	},
    
    grupo : function(component, event, helper) {
        
		helper.setGrupo(component,component.get("v.recordId"),component.get("v.campana.Grupo_Control__c"), component.get("v.cg_pct"),  component.get("v.cg_check"));
      //  debugger;
        console.log("Creamos el grupo! ");
	}
})