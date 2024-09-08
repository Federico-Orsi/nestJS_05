import { SetMetadata } from '@nestjs/common';
import { ROLES_METADATA_KEY, UserRoles } from 'src/enums/user-roles.enum';


export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_METADATA_KEY, roles);