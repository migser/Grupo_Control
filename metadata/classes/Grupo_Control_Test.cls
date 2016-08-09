@isTest
private class Grupo_Control_Test {

	@isTest static void getUserLanguage() {

		String idioma = Grupo_Control.getUserLanguage();

		System.assertEquals('en',idioma);
	}

	@isTest static void getCampana() {

		Campaign c = new Campaign (Name = 'Test');
		insert c;

		Campaign c2 = Grupo_Control.getCampana(c.id, 'Grupo_Control__c');

		System.assertEquals(c.id,c2.id);

		
	}

	@isTest static void setGrupo() {
	
	Campaign c = new Campaign (Name = 'Test');

	Account a = new Account (Name ='Test Account');

	insert a;
	
	insert c;
	
	Contact c1 = new Contact (FirstName = 'A', LastName = 'B', Accountid= a.id);

	insert c1;
	
	Contact c2 = new Contact (FirstName = 'A', LastName = 'B', Accountid= a.id);

	insert c2;

	CampaignMember m1 = new CampaignMember (ContactId = c1.id, CampaignId = c.id);
	CampaignMember m2 = new CampaignMember (ContactId = c2.id, CampaignId = c.id);

	insert m1;
	insert m2;

	Integer i = Grupo_Control.setGrupo(c.id,150,'Grupo_Control__c','grupo_de_Control__c');	

	System.assertEquals(2,i);

	}

}