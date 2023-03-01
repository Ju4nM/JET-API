import { Test, TestingModule } from "@nestjs/testing";
import { LimitTemperaturesService } from "./limit-temperatures.service";

describe("LimitTemperaturesService", () => {
	let service: LimitTemperaturesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LimitTemperaturesService],
		}).compile();

		service = module.get<LimitTemperaturesService>(
			LimitTemperaturesService,
		);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
