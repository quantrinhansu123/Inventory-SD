export interface Step {
  id: number;
  title: string;
  description: string;
}

export interface Recipe {
  id: string;
  driveId: string;
  title: string;
  chef: string;
  duration: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  ingredients: string[];
  steps: Step[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    driveId: '16qXN-_f4Mciqjp1sd7ZwCC5g3Iiopve3',
    title: 'Hướng Dẫn Nấu Ăn Chuyên Nghiệp',
    chef: 'Chef Hoàng',
    duration: '15 phút',
    difficulty: 'Trung bình',
    ingredients: [
      '500g Thịt bò thăn',
      '2 củ Hành tây',
      '3 tép Tỏi băm',
      'Gia vị: Muối, tiêu, dầu hào',
      'Rau thơm trang trí'
    ],
    steps: [
      {
        id: 1,
        title: 'Sơ chế nguyên liệu',
        description: 'Thịt bò rửa sạch, thái miếng vừa ăn. Hành tây bổ múi cau. Tỏi băm nhỏ.'
      },
      {
        id: 2,
        title: 'Ướp thịt bò',
        description: 'Ướp thịt bò với 1 thìa dầu hào, tỏi băm, một chút muối và tiêu trong 15 phút.'
      },
      {
        id: 3,
        title: 'Xào hành tây',
        description: 'Cho dầu vào chảo, phi thơm tỏi rồi cho hành tây vào xào chín tới, trút ra đĩa.'
      },
      {
        id: 4,
        title: 'Nấu thịt bò',
        description: 'Dùng chảo đó, cho thêm dầu, để lửa lớn rồi cho thịt bò vào xào nhanh tay cho đến khi chín tái.'
      },
      {
        id: 5,
        title: 'Hoàn thiện',
        description: 'Cho hành tây vào lại chảo, đảo đều cùng thịt bò rồi tắt bếp. Trình bày ra đĩa và thưởng thức.'
      }
    ]
  },
  {
    id: '2',
    driveId: '1-placeholder-id',
    title: 'Món Gà Chiên Mắm',
    chef: 'Chef Lan',
    duration: '25 phút',
    difficulty: 'Dễ',
    ingredients: [
      '1 con Gà (khoảng 1.2kg)',
      'Nước mắm ngon',
      'Đường, tỏi, ớt',
      'Bột chiên giòn'
    ],
    steps: [
      {
        id: 1,
        title: 'Chuẩn bị gà',
        description: 'Gà chặt miếng vừa ăn, để ráo nước.'
      },
      {
        id: 2,
        title: 'Chiên gà',
        description: 'Lăn gà qua bột chiên giòn rồi chiên vàng đều các mặt.'
      },
      {
        id: 3,
        title: 'Làm sốt mắm',
        description: 'Pha hỗn hợp nước mắm, đường, tỏi ớt băm nhỏ.'
      },
      {
        id: 4,
        title: 'Rim gà',
        description: 'Cho gà đã chiên vào chảo sốt, đảo đều cho thấm gia vị.'
      }
    ]
  }
];
