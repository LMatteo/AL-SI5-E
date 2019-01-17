let idglob : number = 0;

export function createUuid() : number{
    return idglob++;
}