class Float16 {
    public constructor(private byte1: number, private byte2: number) {}

    public get value(): number {
        return this.byte1 + this.byte2;
    }
}

export default Float16;
