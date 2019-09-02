export class EmployeeInfo
{
	firstName: string;
	lastName: string;
	
	uuid: string;
	employeeId: string;

	role: string;
	hireDate: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}
