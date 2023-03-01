import { Test, TestingModule } from "@nestjs/testing";
import { NotificationDetailService } from "./notification-detail.service";

describe("NotificationDetailService", () => {
	let service: NotificationDetailService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [NotificationDetailService],
		}).compile();

		service = module.get<NotificationDetailService>(
			NotificationDetailService,
		);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
