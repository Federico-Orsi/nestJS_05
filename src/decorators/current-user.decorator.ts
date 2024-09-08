import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const getCurrentUserByContext = (context: ExecutionContext) => {
 return context.switchToHttp().getRequest().user;
}

export const Current_User = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context)
)