public class Grupo_Control {

	@AuraEnabled

	public static String getUserLanguage(){
	
	String l =  userinfo.getLanguage();

	if (l.startsWith('en_')) {
		return 'en';		
	} else if (l.startsWith('es')) {
		return 'es';
	} else {
		return 'en';
	}

	}


	@AuraEnabled

	public static Campaign getCampana(Id campanaId, String cg_pct){
		Campaign c;
		try{
			c  = Database.query('SELECT Id, Name, '+cg_pct+' FROM Campaign WHERE Id = \''+campanaId+'\'');
		}catch(exception e){
			throw new AuraHandledException('Error recuperando campaña.');
			return  null;
		}
		system.debug('Devolviendo campana:' +c.Id);
		return c;
	}

	@AuraEnabled

	public static Integer setGrupo(Id campanaId, Decimal pct, String cg_pct, String cg_check){

		System.debug('Actualizando campaña...');
		if (pct>100) {
			pct=100;
		}
		//Campaign c = [SELECT Id, Name, Grupo_Control__c FROM Campaign WHERE Id = :campanaId];
		
		Campaign c = Database.query('SELECT Id, Name, '+cg_pct+' FROM Campaign WHERE Id = \''+campanaId+'\'');
		if (pct!=c.get(cg_pct)) {
			c.put(cg_pct, pct);
			update(c);
		}

		List<CampaignMember> miembros = Database.query('select id, '+cg_check+ ' from Campaignmember where campaignid =  \''+campanaId+'\'');
		for (CampaignMember m : miembros) {
			//m.grupo_de_control__c=false;
			m.put(cg_check,false);
		}
		update(miembros);
		List<Campaignmember> seleccionados = new List<CampaignMember>();
		system.debug('Creando grupo para campana:' +campanaId);
		Integer num = miembros.size();
		Integer resultado = (Integer) Math.floor(num * (pct/100));

		System.debug('Resultado: ' + resultado);

		for (Integer i=0; i<resultado; i++) {

			Integer elegido = Math.round(Math.random()*(miembros.size()-1));	
			System.debug('Elegido: '+elegido);

			CampaignMember m = miembros.get(elegido);
			m.put(cg_check,true);
			seleccionados.add(m);
			miembros.remove(elegido);

		}

		System.debug('Total Elegidos: ' + seleccionados.size());

		update(seleccionados);

		return seleccionados.size();







	}

}